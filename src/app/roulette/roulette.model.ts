import { build, Collection } from '@caiu/library';
import { BehaviorSubject, Observable } from 'rxjs';

export class RouletteWheelSpin {
    slot: RouletteWheelSlot = new RouletteWheelSlot();

    get slotColor(): string {
        return this.slot.color;
    }

    get slotNumber(): string {
        return this.slot.number;
    }

}

export class Roulette extends Collection<RouletteWheelSpin> {
}

export class RouletteWheel {
    ballSubject = new BehaviorSubject<RouletteBall>(new RouletteBall());
    lastSpin: RouletteWheelSpin;
    lastSpinSubject = new BehaviorSubject<RouletteWheelSpin>(null);
    moment = 0;
    status: 'STOPPED' | 'STARTED' | 'TRANSITIONING' | 'SPINNING' = 'STOPPED';
    timerPeriod = 10;
    totalSpinSeconds = 12;
    _ball: RouletteBall;
    _slots: RouletteWheelSlot[] = [];

    static ArcLength(diameter: number, centralAngle: number): number {
        return Math.PI * diameter * (centralAngle / 360);
    }

    static Degrees2Radians(degrees: number) {
        return Math.PI / 180 * degrees;
    }

    static GetPositionRelativeToCenter(center: PixelPosition, coordinates: PixelCoordinates, degrees: number): PixelPosition {
        if (degrees <= 90) {
            return build(PixelPosition, {
                top: center.top - coordinates.y,
                left: center.left + coordinates.x
            });
        } else if (degrees <= 180) {
            return build(PixelPosition, {
                top: center.top + coordinates.y,
                left: center.left + coordinates.x
            });
        } else if (degrees <= 270) {
            return build(PixelPosition, {
                top: center.top + coordinates.y,
                left: center.left - coordinates.x
            });
        } else {
            return build(PixelPosition, {
                top: center.top - coordinates.y,
                left: center.left - coordinates.x
            });
        }
    }

    static RotateSlot(slot: RouletteWheelSlot, delta: number): RouletteWheelSlot {
        const d = (slot.startDegrees - delta) % 360;
        const startDegrees = d < 0 ? d + 360 : d;
        const endDegrees = (startDegrees + 360 / 38) % 360;
        // console.log(
        //     '\n\nSlot Number:\t', slot.number, '\nDelta:\t', delta,
        //     '\nStart Degrees:\t', slot.startDegrees, '\nEnd Degrees:\t', slot.endDegrees,
        //     '\nDelta Start Degrees:\t', startDegrees, '\nDelta End Degrees:\t', endDegrees);
        return build(RouletteWheelSlot, slot, { startDegrees, endDegrees });
    }

    static RotateSlots(slots: RouletteWheelSlot[], delta: number): RouletteWheelSlot[] {
        return slots.map(x => RouletteWheel.RotateSlot(x, delta));
    }

    static Radians2Degrees(radians: number) {
        return 180 / Math.PI * radians;
    }

    constructor(
        public diameter = 500,
        public offsetLeft = 0,
        public offsetTop = 0,
        public wheelSecondsPerRevolution = 5,
        public ballSecondsPerRevolution = 1) {
        this.slots = [
            build(RouletteWheelSlot, { number: '00' }),
            build(RouletteWheelSlot, { number: '27' }),
            build(RouletteWheelSlot, { number: '10' }),
            build(RouletteWheelSlot, { number: '35' }),
            build(RouletteWheelSlot, { number: '29' }),
            build(RouletteWheelSlot, { number: '12' }),
            build(RouletteWheelSlot, { number: '8' }),
            build(RouletteWheelSlot, { number: '19' }),
            build(RouletteWheelSlot, { number: '31' }),
            build(RouletteWheelSlot, { number: '18' }),
            build(RouletteWheelSlot, { number: '6' }),
            build(RouletteWheelSlot, { number: '21' }),
            build(RouletteWheelSlot, { number: '33' }),
            build(RouletteWheelSlot, { number: '16' }),
            build(RouletteWheelSlot, { number: '4' }),
            build(RouletteWheelSlot, { number: '23' }),
            build(RouletteWheelSlot, { number: '35' }),
            build(RouletteWheelSlot, { number: '14' }),
            build(RouletteWheelSlot, { number: '2' }),
            build(RouletteWheelSlot, { number: '0' }),
            build(RouletteWheelSlot, { number: '28' }),
            build(RouletteWheelSlot, { number: '9' }),
            build(RouletteWheelSlot, { number: '26' }),
            build(RouletteWheelSlot, { number: '30' }),
            build(RouletteWheelSlot, { number: '11' }),
            build(RouletteWheelSlot, { number: '7' }),
            build(RouletteWheelSlot, { number: '20' }),
            build(RouletteWheelSlot, { number: '32' }),
            build(RouletteWheelSlot, { number: '17' }),
            build(RouletteWheelSlot, { number: '5' }),
            build(RouletteWheelSlot, { number: '22' }),
            build(RouletteWheelSlot, { number: '34' }),
            build(RouletteWheelSlot, { number: '15' }),
            build(RouletteWheelSlot, { number: '3' }),
            build(RouletteWheelSlot, { number: '24' }),
            build(RouletteWheelSlot, { number: '36' }),
            build(RouletteWheelSlot, { number: '13' }),
            build(RouletteWheelSlot, { number: '1' }),
        ];
    }

    get lastSpin$(): Observable<RouletteWheelSpin> {
        return this.lastSpinSubject.asObservable();
    }

    set ball(value: RouletteBall) {
        this._ball = value;
    }

    get ball(): RouletteBall {
        return this._ball || this.ballBeforeSpin;
    }

    get ballBeforeSpin(): RouletteBall {
        return build(RouletteBall, {
            positionTop: this.centerPosition.top - this.ballDistanceFromCenterInitial,
            positionLeft: this.centerPosition.left
        });
    }

    get ball$(): Observable<RouletteBall> {
        return this.ballSubject.asObservable();
    }

    get ballDegreesTraversedPerMoment(): number {
        return (this.ballRevolutionsPerSpin * 360) / this.momentsPerSpin;
    }

    get ballDistanceTraversed(): number {
        return this.ballDistanceFromCenterInitial - this.ballDistanceFromCenterFinal;
    }

    get ballDistanceTraversedPerMoment(): number {
        return this.ballDistanceTraversed / this.momentsPerSpin;
    }

    get ballDistanceFromCenter(): number {
        return this.getDistanceFromCenter(this.ball.position);
    }

    get ballDistanceFromCenterInitial(): number {
        return this.radius + 100;
    }

    get ballDistanceFromCenterFinal(): number {
        return this.radius - 0;
    }

    get ballRevolutionsPerSpin(): number {
        return this.totalSpinSeconds * this.ballSecondsPerRevolution;
    }

    get ballStopped(): boolean {
        return this.ballDistanceFromCenter <= this.ballDistanceFromCenterFinal;
    }

    get centerPosition(): PixelPosition {
        return build(PixelPosition, {
            top: this.offsetTop + this.radius,
            left: this.offsetLeft + this.radius,
        });
    }

    get circumference(): number {
        return Math.PI * this.diameter;
    }

    get defaultBallPosition(): PixelPosition {
        return build(PixelPosition, {
            top: this.centerPosition.top - this.ballDistanceFromCenterFinal,
            left: this.centerPosition.left,
        });
    }

    get lastSlotPosition(): PixelPosition {
        return this.getSlotPosition(this.lastSpin.slotNumber);
    }

    get momentsPerBallRevolution(): number {
        return this.ballSecondsPerRevolution / this.momentsPerSecond;
    }

    get momentsPerSecond(): number {
        return 1000 / this.timerPeriod;
    }

    get momentsPerSpin(): number {
        return this.momentsPerSecond * this.totalSpinSeconds;
    }

    get nextBallPosition(): PixelPosition {
        return this.getPositionRelativeToCenter(this.nextBallPositionRelativeToCenter);
    }

    get nextBallPositionRelativeToCenter(): PixelCoordinates {
        const radians = this.nextBallPositionTheta * (Math.PI / 180);
        const d = this.nextBallPositionDistanceFromCenter;
        return build(PixelCoordinates, {
            x: d * Math.cos(radians),
            y: d * Math.cos(radians) * Math.tan(radians)
        });
    }

    get nextBallPositionDegreesTraversed(): number {
        return (this.moment * this.ballDegreesTraversedPerMoment) % 360;
    }

    get nextBallPositionDistanceFromCenter(): number {
        const d = this.ballDistanceFromCenter - this.ballDistanceTraversedPerMoment;
        return Math.max(d, this.ballDistanceFromCenterFinal);
    }

    get nextBallPositionTheta(): number {
        const d = this.nextBallPositionDegreesTraversed;
        if (d <= 90) {
            return 90 - d;
        } else if (d <= 180) {
            return d - 90;
        } else if (d <= 270) {
            return 270 - d;
        } else {
            return d - 270;
        }
    }

    get radius(): number {
        return this.diameter / 2;
    }

    get slotArcLength(): number {
        return RouletteWheel.ArcLength(this.diameter, this.slotCentralAngle);
    }

    get slotCentralAngle(): number {
        return 360 / 38;
    }

    set slots(value: RouletteWheelSlot[]) {
        this._slots = value.map((x, i) => {
            const startDegrees = i === 0 ? 360 - 360 / (38 * 2) : (360 / 38) * (i - 1) + 360 / (38 * 2);
            const endDegrees = (startDegrees + 360 / 38) % 360;
            return build(RouletteWheelSlot, x, { startDegrees, endDegrees });
        });
    }

    get slots(): RouletteWheelSlot[] {
        return this._slots;
    }

    get spinning(): boolean {
        return this.status === 'SPINNING';
    }

    get started(): boolean {
        return !this.stopped;
    }

    get stopped(): boolean {
        return this.status === 'STOPPED';
    }

    get transitioning(): boolean {
        return this.status === 'TRANSITIONING';
    }

    get wheelDegreesPerMoment(): number {
        return (360 / this.wheelSecondsPerRevolution) * (this.timerPeriod / 1000);
    }

    degreesAtTime(t: number): number {
        return (t * this.wheelDegreesPerMoment) % 360;
    }

    emitNextBall(ball: RouletteBall) {
        this.ball = ball;
        this.ballSubject.next(ball);
    }

    emitDefaultBall() {
        this.emitNextBall(this.ballBeforeSpin);
    }

    getDegreesTraversed(pos: PixelPosition): number {
        const centerLeft = this.centerPosition.left;
        const centerTop = this.centerPosition.top;
        const x = pos.left - centerLeft;
        const y = pos.top - centerTop;
        // console.log(x, y, Math.atan(Math.abs(x) / Math.abs(y)), RouletteWheel.Radians2Degrees(Math.atan(Math.abs(y) / Math.abs(x))));
        const theta = RouletteWheel.Radians2Degrees(Math.atan(Math.abs(y) / Math.abs(x)));
        if (x >= 0 && y <= 0) { // Q1
            // console.log('Q1', 270 + theta);
            return 270 + theta;
        } else if (x >= 0 && y >= 0) { // Q2
            // console.log('Q2', 270 - theta);
            return 270 - theta;
        } else if (x <= 0 && y >= 0) { // Q3
            // console.log('Q3', 90 + theta);
            return 90 + theta;
        } else if (x <= 0 && y <= 0) { // Q4
            // console.log('Q4', 90 - theta);
            return 90 - theta;
        }
    }

    getDistanceFromCenter(pos: PixelPosition): number {
        return Math.sqrt(Math.pow(this.centerPosition.top - pos.top, 2) + Math.pow(this.centerPosition.left - pos.left, 2));
    }

    getPositionRelativeToCenter(coordinates: PixelCoordinates): PixelPosition {
        return RouletteWheel.GetPositionRelativeToCenter(this.centerPosition, coordinates, this.nextBallPositionDegreesTraversed);
    }

    getSlotPosition(slotNumber: string): PixelPosition {
        const slot = RouletteWheel.RotateSlot(this.slots.find(x => x.number === slotNumber), this.degreesAtTime(this.moment));
        // this.log(slot);
        return slot.getBallPosition(this.centerPosition, this.radius);
    }

    playSound() {
        const audio = new Audio('assets/roulette-spin.mp3');
        audio.play();
    }

    slotAtTimeAndDegrees(t: number, degrees: number): RouletteWheelSlot {
        return this.slotsAtTime(t).find(x => x.inSlot(360 - degrees));
    }

    slotAtTimeAndPosition(t: number, pos: PixelPosition): RouletteWheelSlot {
        // console.log(this.moment);
        const degrees = this.getDegreesTraversed(pos);
        console.log(degrees);
        return this.slotAtTimeAndDegrees(t, degrees);
    }

    slotsAtTime(t: number): RouletteWheelSlot[] {
        return RouletteWheel.RotateSlots(this.slots, this.degreesAtTime(t));
    }

    start() {
        console.log('START');
        this.status = 'STARTED';
        this.emitDefaultBall();
        this.getNextMoment();
    }

    startSpin() {
        console.log('START SPIN');
        if (this.started) {
            this.status = 'SPINNING';
            this.playSound();
        }
    }

    endSpin(t: number, pos: PixelPosition) {
        console.log('END SPIN', t);
        const spin = build(RouletteWheelSpin, {
            slot: this.slotAtTimeAndPosition(t, pos),
        });
        console.dir(spin);
        this.lastSpin = spin;
        this.lastSpinSubject.next(this.lastSpin);
        this.startTransition();
    }

    startTransition() {
        console.log('START TRANSITION');
        this.status = 'TRANSITIONING';
        // setTimeout(() => {
        //     this.stopTransition();
        // }, 20000);
    }

    stop() {
        console.log('STOP');
        this.status = 'STOPPED';
    }

    stopTransition() {
        console.log('STOP TRANSITION');
        this.status = 'STARTED';
        this.emitNextBall(this.ballBeforeSpin);
    }

    private getNextMoment() {
        // this.log(this.status);
        switch (this.status) {
            case 'STARTED':
                this.timeout();
                break;
            case 'SPINNING':
                if (this.ballStopped) {
                    this.endSpin(this.moment, this.ball.position);
                    this.timeout();
                } else {
                    this.timeout(() => {
                        const position = this.nextBallPosition;
                        const ball = build(RouletteBall, { position });
                        this.emitNextBall(ball);
                    });
                }
                break;
            case 'TRANSITIONING':
                this.timeout(() => {
                    const position = this.lastSlotPosition;
                    const ball = build(RouletteBall, { position });
                    this.emitNextBall(ball);
                });
                break;
        }
    }

    private log(e: any) {
        if (this.moment % 100 === 0) {
            console.log('\n\nMoment = ', this.moment);
            console.dir(e);
            console.log('\n\n');
        }
    }

    private timeout(fn?: Function) {
        setTimeout(() => {
            this.moment += 1;
            if (fn && typeof fn === 'function') {
                fn();
            }
            this.getNextMoment();
        }, this.timerPeriod);
    }

}

export class RouletteBall {
    positionLeft = 0;
    positionTop = 0;

    set position(value: PixelPosition) {
        this.positionLeft = value.left;
        this.positionTop = value.top;
    }

    get position(): PixelPosition {
        return build(PixelPosition, {
            top: this.positionTop,
            left: this.positionLeft
        });
    }

}

export class PixelCoordinates {
    x = 0;
    y = 0;
}

export class PixelPosition {
    top = 0;
    left = 0;
}

export class RouletteWheelSlot {
    number = '';
    startDegrees = 0;
    endDegrees = 0;

    get color(): 'Red' | 'Black' | 'Green' {
        switch (this.number) {
            case '0':
                return 'Green';
            case '00':
                return 'Green';
            case '27':
                return 'Red';
            case '10':
                return 'Black';
            case '35':
                return 'Red';
            case '29':
                return 'Black';
            case '12':
                return 'Red';
            case '8':
                return 'Black';
            case '19':
                return 'Red';
            case '31':
                return 'Black';
            case '18':
                return 'Red';
            case '6':
                return 'Black';
            case '21':
                return 'Red';
            case '33':
                return 'Black';
            case '16':
                return 'Red';
            case '4':
                return 'Black';
            case '23':
                return 'Red';
            case '35':
                return 'Black';
            case '14':
                return 'Red';
            case '2':
                return 'Black';
            case '28':
                return 'Black';
            case '9':
                return 'Red';
            case '26':
                return 'Black';
            case '30':
                return 'Red';
            case '11':
                return 'Black';
            case '7':
                return 'Red';
            case '20':
                return 'Black';
            case '32':
                return 'Red';
            case '17':
                return 'Black';
            case '5':
                return 'Red';
            case '22':
                return 'Black';
            case '34':
                return 'Red';
            case '15':
                return 'Black';
            case '3':
                return 'Red';
            case '24':
                return 'Black';
            case '36':
                return 'Red';
            case '13':
                return 'Black';
            case '1':
                return 'Red';
            default:
                return null;
        }
    }

    get ballDegrees(): number {
        const d = this.startDegrees;
        if (d <= 90) {
            return 90 - d;
        } else if (d <= 180) {
            return d - 90;
        } else if (d <= 270) {
            return 270 - d;
        } else {
            return d - 270;
        }
    }

    getBallPosition(center: PixelPosition, radius: number): PixelPosition {
        const degrees = this.ballDegrees;
        const radians = degrees * (Math.PI / 180);
        const d = radius;
        const coordinates = build(PixelCoordinates, {
            x: d * Math.cos(radians),
            y: d * Math.cos(radians) * Math.tan(radians)
        });
        return RouletteWheel.GetPositionRelativeToCenter(center, coordinates, this.startDegrees);
    }

    inSlot(degrees: number): boolean {
        return (degrees >= this.startDegrees && degrees < this.endDegrees)
            || (this.startDegrees > this.endDegrees && degrees > (this.startDegrees || degrees < this.endDegrees));
    }

}
