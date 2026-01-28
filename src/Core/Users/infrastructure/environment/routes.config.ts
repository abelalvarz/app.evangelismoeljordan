
export class RoutesConfig {

    constructor() {}
    public static readonly BASE_API_URL: string = import.meta.env.VITE_EVANGELISMO_API;
    
    public static readonly AUTH_API_URL: string = `${RoutesConfig.BASE_API_URL}/auth`;
}