<?php
declare(strict_types = 1);
/**
 * Created by PhpStorm.
 * User: opiru
 * Date: 09.11.2016
 * Time: 19:24
 */

namespace App\Http\Controllers;

use App\Lib\UserCreator;
use App\Lib\AuthManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Class UserController
 * @package App\Http\Controllers
 */
class UserController
{
    /**
     * Creates user
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function addUserToTheQueue(Request $request)
    {
        $requestData = $request->all();
        $response = UserCreator::addToTheQueue($requestData);
        if (!$response) {
            return response(UserCreator::getErrors()->toJson(), 400);
        }
        return response('', 200);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function auth(Request $request)
    {
        $requestData = $request->all();
        $result = AuthManager::authUser($requestData);
        if (!$result) {
            $errors = AuthManager::getErrors();
            return response(json_encode($errors), 400);
        }
        return response(AuthManager::getIdAndToken(), 200);
    }

    public function logout(Request $request)
    {
        $userId = Auth::id();
        $token = $request->get('token');
        if ($token) {
            $result = AuthManager::logoutUser($userId, $token);
            if (!$result) {
                $errors = AuthManager::getErrors();
                return response(json_encode($errors), 400);
            }
        }
        return response('', 200);
    }

    public function index(Request $request)
    {
        $user = Auth::user();
        $data = [
            'id' => $user->id,
            'avatar' => $user->avatar,
            'name' => $user->name,
            'profession' => $user->profession,
        ];
        return response(json_encode($data), 200);
    }
}