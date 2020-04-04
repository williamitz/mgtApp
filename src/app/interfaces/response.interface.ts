export interface IResponse {
    ok: boolean;
    data?: any;
    error?: any;
    total?: number;
    message?: string;
    token?: string;
    showError?: number;
}
