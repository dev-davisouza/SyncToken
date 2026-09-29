export default interface IBackEndSocketEvent {
  readonly type:
    | "connect"
    | "update"
    | "create"
    | "generic_error"
    | "form_error";
  readonly message: string;
}
