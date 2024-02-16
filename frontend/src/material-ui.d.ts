import '@material-ui/core/Card';

declare module '@material-ui/core/Card' {
  interface CardPropsVariantOverrides {
    form: true;
  }
}
