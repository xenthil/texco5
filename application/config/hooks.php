<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$hook['pre_system'][] = array(
    'class'    => 'CorsHook',
    'function' => 'apply_cors',
    'filename' => 'CorsHook.php',
    'filepath' => 'hooks'
);

$hook['post_controller_constructor'][] = [
    'class'    => 'SecureIdHook',
    'function' => 'decodeIdInRequest',
    'filename' => 'SecureIdHook.php',
    'filepath' => 'hooks'
];

$hook['display_override'][] = [
    'class'    => 'SecureIdHook',
    'function' => 'encodeIdInResponse',
    'filename' => 'SecureIdHook.php',
    'filepath' => 'hooks'
];
