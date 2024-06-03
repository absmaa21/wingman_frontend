import ValorantClient, {ValorantClientError} from '../../clients/valorant-client';
import EnumError from '../../error';
import Result from '../../result';
import {Method, Headers} from '../../http/http';
import { Agent } from '../../types/game-content/Agents/Agents';
import { CachedGameContentVersionEndpoint } from './endpoint';

class AgentsEndpoint extends CachedGameContentVersionEndpoint<Agent> {
    public host(): Result<URL | undefined, EnumError<ValorantClientError>> {
        return Result.ok(new URL(`https://valorant-api.com`));
    }

    public endpoint(): string {
        return '/v1/agents';
    }

    public method(): Method {
        return Method.GET;
    }
}

export default AgentsEndpoint;
