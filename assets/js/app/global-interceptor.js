(function() {
    'use strict';
    
    // Create a base module that will be auto-bootstrapped
    angular.module('globalInterceptors', [])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push(function() {
            return {
                request: function(config) {
                    if (config.url.includes('?')) {
                        const [baseUrl, queryString] = config.url.split('?');
                        const params = new URLSearchParams(queryString);
                        
                        params.forEach((value, key) => {
                            if ((key.endsWith('id') || key === 'id') && value) {
                                params.set(key + 'Token', btoa(JSON.stringify({
                                    id: value,
                                    timestamp: Date.now()
                                })));
                                params.delete(key);
                            }
                        });
                        
                        config.url = baseUrl + '?' + params.toString();
                    }
                    return config;
                }
            };
        });
    }]);

    // Auto-bootstrap the interceptor
    angular.element(document).ready(function() {
        angular.bootstrap(document.documentElement, ['globalInterceptors']);
    });
})();