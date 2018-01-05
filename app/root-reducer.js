import {combineReducers} from 'redux';
import provider_requests from './containers/ProviderRequestsList/duck/reducers';
import provider_requests_map from './containers/maps/ProviderRequestsMap/duck/reducers';
import single_request from './containers/ProvidersRequest/duck/reducers';
import request_creation_wizard from './containers/CreationWizard/duck/reducers';

import service_requester_requests from './containers/RequesterRequestsList/duck/reducers';
import service_requester_requests_map from './containers/maps/RequesterRequestsMap/duck/reducers';

export default combineReducers({
  provider_requests,
  provider_requests_map,
  service_requester_requests,
  service_requester_requests_map,
  single_request,
  request_creation_wizard
});
