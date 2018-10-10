import { Collection, build } from '@caiu/library';

export class Round {

}

export class Rounds extends Collection<Round> {

    constructor() {
        super(Round);
    }

    update(data: Round | Round[]): Rounds {
        return build(Rounds, super.update(data));
    }

}
