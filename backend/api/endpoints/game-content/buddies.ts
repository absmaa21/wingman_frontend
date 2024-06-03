import {ValorantClientError} from '../../clients/valorant-client';
import EnumError from '../../error';
import Result from '../../result';
import {Method, Headers} from '../../http/http';
import { CachedGameContentVersionEndpoint } from './endpoint';
import { Buddie } from '../../types/game-content/Buddies/Buddies';

class BuddiesEndpoint extends CachedGameContentVersionEndpoint<Buddie> {
    public host(): Result<URL | undefined, EnumError<ValorantClientError>> {
        return Result.ok(new URL(`https://valorant-api.com`));
    }

    public endpoint(): string {
        return '/v1/buddies';
    }

    public method(): Method {
        return Method.GET;
    }
}

export default BuddiesEndpoint;
