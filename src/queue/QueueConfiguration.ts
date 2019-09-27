import ConfigurationBase from "../common/ConfigurationBase";
import { StoreDestinationArray } from "../common/persistence/IExtentStore";
import {
  DEFAULT_ENABLE_ACCESS_LOG,
  DEFAULT_ENABLE_DEBUG_LOG,
  DEFAULT_QUEUE_EXTENT_LOKI_DB_PATH,
  DEFAULT_QUEUE_LISTENING_PORT,
  DEFAULT_QUEUE_LOKI_DB_PATH,
  DEFAULT_QUEUE_PERSISTENCE_PATH,
  DEFAULT_QUEUE_SERVER_HOST_NAME
} from "./utils/constants";

export const DEFUALT_QUEUE_PERSISTENCE_ARRAY: StoreDestinationArray = [
  {
    persistencyId: "Default",
    persistencyPath: DEFAULT_QUEUE_PERSISTENCE_PATH,
    maxConcurrency: 10
  }
];

/**
 * Default configurations for default implementation of QueueServer.
 *
 * As default implementation of QueueServer class leverages LokiJS DB.
 * This configuration class also maintains configuration settings for LokiJS DB.
 *
 * When creating other server implementations, should also create a NEW
 * corresponding configuration class by extending ConfigurationBase.
 *
 * @export
 * @class Configuration
 */
export default class QueueConfiguration extends ConfigurationBase {
  public constructor(
    host: string = DEFAULT_QUEUE_SERVER_HOST_NAME,
    port: number = DEFAULT_QUEUE_LISTENING_PORT,
    public readonly metadataDBPath: string = DEFAULT_QUEUE_LOKI_DB_PATH,
    public readonly extentDBPath: string = DEFAULT_QUEUE_EXTENT_LOKI_DB_PATH,
    public readonly persistencePathArray: StoreDestinationArray = DEFUALT_QUEUE_PERSISTENCE_ARRAY,
    enableAccessLog: boolean = DEFAULT_ENABLE_ACCESS_LOG,
    accessLogWriteStream?: NodeJS.WritableStream,
    enableDebugLog: boolean = DEFAULT_ENABLE_DEBUG_LOG,
    debugLogFilePath?: string
  ) {
    super(
      host,
      port,
      enableAccessLog,
      accessLogWriteStream,
      enableDebugLog,
      debugLogFilePath
    );
  }
}