<?php
declare(strict_types = 1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth as AuthFacade;
use App\Models\UserAuth;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class Auth
 * @package App\Http\Middleware
 */
class Auth
{
    protected static $ignoredWays = [
        '/',
        'user/auth',
        'user/ask-for-account',
    ];

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     * @throws \InvalidArgumentException
     */
    public function handle($request, Closure $next)
    {
        if (!in_array($request->path(), static::$ignoredWays, true)) {
            $input = $request->input();
            $token = $input['token'] ?? false;
            if ($token) {
                $userAuth = UserAuth::where('token', $token)->first();

                if ($userAuth) {
                    $user = $userAuth->user;
                    AuthFacade::login($user);
                    return $next($request);
                }
            }

            $response = json_encode([
                'message' => 'Вы не авторизированы.'
            ]);
            return new Response($response, Response::HTTP_UNAUTHORIZED);
        } else {
            return $next($request);
        }

    }
}
