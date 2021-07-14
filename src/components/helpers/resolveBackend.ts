import {
  HttpConnection,
  Location,
  LocationService,
  Prefix
} from '@tmtsoftware/esw-ts'

const backendServicePrefix = Prefix.fromString('ESW.sample')
export const BACKEND_CONNECTION = HttpConnection(
  backendServicePrefix,
  'Service'
)

export const resolveBackendUrl = (
  locationService: LocationService
): Promise<Location | undefined> =>
  locationService.find(BACKEND_CONNECTION).then((loc) => loc)
