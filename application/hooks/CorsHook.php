<?php
defined('BASEPATH') or exit('No direct script access allowed');

class CorsHook
{
    public function cors_hook()
    {
        // Deprecated. Use apply_cors() instead. Keeping it in case old parts are using it.
        $this->apply_cors();
    }

    public function apply_cors()
    {
        $CI = &get_instance();

        // Load valid hosts from JSON
        $validHostsPath = dirname(APPPATH) . '/shared-config/valid-hosts.json';
        $validHosts = [];

        if (file_exists($validHostsPath)) {
            $validHostsJson = file_get_contents($validHostsPath);
            $validHosts = json_decode($validHostsJson, true);

            if (!is_array($validHosts)) {
                log_message('error', 'Invalid format for valid-hosts.json. Expected an array.');
                $validHosts = [];
            }
        }

        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

        if ($origin) {
            $parsedOrigin = parse_url($origin);
            $originHost = $parsedOrigin['host'] ?? '';
            $originPort = $parsedOrigin['port'] ?? null;

            // Rebuild host with port if present
            $originHostWithPort = $originHost . ($originPort ? ":$originPort" : '');

            $isLocalhost = in_array($originHost, ['localhost', '127.0.0.1']);

            if (
                in_array($originHostWithPort, $validHosts) || 
                in_array($originHost, $validHosts) || 
                ($isLocalhost && (defined('ENVIRONMENT') && ENVIRONMENT === 'development'))
            ) {
                header("Access-Control-Allow-Origin: $origin");
                header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
                header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
                header("Access-Control-Allow-Credentials: true");
            }
        }

        // Handle preflight (OPTIONS) requests early
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            if (empty($origin)) {
                // Fallback: Allow all if origin missing (rare, but safe for dev)
                header("Access-Control-Allow-Origin: *");
            }

            header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
            header("Access-Control-Allow-Credentials: true");
            header("Access-Control-Max-Age: 86400"); // 24h cache

            http_response_code(200);
            exit(0);
        }
    }
}
