;(function () {
    'use strict';
    angular.module('app')
        .factory('IQAHttpInterceptor', ['$q', '$rootScope', 'UserModel', 'Logger',
            function ($q, $rootScope, UserModel, Logger) {
                return {
                    // On request success
                    request: function (config) {
                        let token = UserModel.getToken();
                        if (token) {
                            switch (config.method) {
                                case 'POST':
                                    if (!config.data) {
                                        config.data = {};
                                    }
                                    if (config.data.append) {
                                        config.data.append('token', token);
                                    }
                                    else {
                                        config.data['token'] = token;
                                    }
                                    break;

                                case 'GET':
                                    if (!config.params) {
                                        config.params = {};
                                    }
                                    config.params['token'] = token;
                                    break;
                            }
                        }
                        return config || $q.when(config);
                    },
                    // On request failure
                    requestError: function (rejection) {
                        Logger.log('Request failer.', 'error');
                        return $q.reject(rejection);
                    },

                    // On response success
                    response: function (response) {
                        return response || $q.when(response);
                    },
                    // On response failture
                    responseError: function (rejection) {
                        if (rejection.status === 401) {
                            $rootScope.$emit("unauthorized");
                        }
                        Logger.log('Response error.', 'error');
                        return $q.reject(rejection);
                    }
                };
            }])
        .run(['UserModel', '$state', '$rootScope', '$http', '$location',
            function (UserModel, $state, $rootScope, $http, $location) {

                $rootScope.$on('unauthorized',
                    () => {
                        $state.go('auth');
                    });

                if (!UserModel.getToken() && $location.path() != '/ask-for-account') {
                    setTimeout(() => $state.go('auth'), 0);
                }
                else {
                    $http.get('/user').success((data) => {
                        UserModel.setData(data);
                    });
                }
            }]);
})();