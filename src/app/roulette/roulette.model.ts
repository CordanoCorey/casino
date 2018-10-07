import { build, Collection } from '@caiu/library';
import { BehaviorSubject, Observable } from 'rxjs';

export class RouletteWheelSpin {

}

export class Roulette extends Collection<RouletteWheelSpin> {
}

export class RouletteWheel {
    ballSubject = new BehaviorSubject<RouletteBall>(new RouletteBall());
    lastSpin: RouletteWheelSlot;
    moment = 0;
    slots: RouletteWheelSlot[] = [
        build(RouletteWheelSlot, { number: '00' }),
        build(RouletteWheelSlot, { number: '27' }),
        build(RouletteWheelSlot, { number: '10' }),
        build(RouletteWheelSlot, { number: '35' }),
        build(RouletteWheelSlot, { number: '29' }),
        build(RouletteWheelSlot, { number: '12' }),
        build(RouletteWheelSlot, { number: '8' }),
        build(RouletteWheelSlot, { number: '19' }),
        build(RouletteWheelSlot, { number: '31' }),
        build(RouletteWheelSlot, { number: '018' }),
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
    spinning = false;
    started = false;
    timerPeriod = 10;
    totalSpinSeconds = 10;
    transitioning = false;
    _ball: RouletteBall;

    static ArcLength(diameter: number, centralAngle: number): number {
        return Math.PI * diameter * (centralAngle / 360);
    }

    constructor(
        public diameter = 0,
        public offsetLeft = 0,
        public offsetTop = 0,
        public wheelSecondsPerRevolution = 3,
        public ballSecondsPerRevolution = 1) {
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
        return this.radius - 10;
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
        // console.log(this.moment, d);
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

    get nextBallPositionMoment(): number {
        return Math.min(this.moment + 1, this.momentsPerSpin);
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

    emitNextBall(ball: RouletteBall) {
        this.ball = ball;
        this.ballSubject.next(ball);
    }

    getDistanceFromCenter(pos: PixelPosition): number {
        return Math.sqrt(Math.pow(this.centerPosition.top - pos.top, 2) + Math.pow(this.centerPosition.left - pos.left, 2));
    }

    getPositionRelativeToCenter(pos: PixelCoordinates): PixelPosition {
        const d = this.nextBallPositionDegreesTraversed;
        if (d <= 90) {
            return build(PixelPosition, {
                top: this.centerPosition.top - pos.y,
                left: this.centerPosition.left + pos.x
            });
        } else if (d <= 180) {
            return build(PixelPosition, {
                top: this.centerPosition.top + pos.y,
                left: this.centerPosition.left + pos.x
            });
        } else if (d <= 270) {
            return build(PixelPosition, {
                top: this.centerPosition.top + pos.y,
                left: this.centerPosition.left - pos.x
            });
        } else {
            return build(PixelPosition, {
                top: this.centerPosition.top - pos.y,
                left: this.centerPosition.left - pos.x
            });
        }
    }

    getSlotPosition() {

    }

    numberAtTimeAndPosition(t: number, pos: PixelPosition): string {
        return '';
    }

    slotAtTimeAndPosition(t: number, pos: PixelPosition): RouletteWheelSlot {
        return build(RouletteWheelSlot, {
            number: this.numberAtTimeAndPosition
        });
    }

    spin() {
        this.spinning = true;
        this.startBall();
    }

    start() {
        this.started = true;
        this.ballSubject.next(this.ballBeforeSpin);
    }

    getNextMoment() {
        if (this.ballStopped) {
            this.stopBall();
        } else {
            setTimeout(() => {
                this.moment = this.nextBallPositionMoment;
                const pos = this.nextBallPosition;
                const ball = build(RouletteBall, {
                    positionLeft: pos.left,
                    positionTop: pos.top,
                });
                this.ball = ball;
                this.ballSubject.next(ball);
                this.getNextMoment();
            }, this.timerPeriod);
        }
    }

    startBall() {
        if (this.spinning) {
            this.getNextMoment();
        }
    }

    startTransition() {
        this.transitioning = true;
        setTimeout(() => {

        }, 20000);
    }

    stop() {
        this.started = false;
    }

    stopBall() {
        this.spinning = false;
    }

    stopTransition() {
        this.emitNextBall(this.ballBeforeSpin);
    }

    toggle() {
        this.started = !this.started;
    }

}

export class RouletteBall {
    moment = 0;
    positionLeft = 0;
    positionTop = 0;
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
}
