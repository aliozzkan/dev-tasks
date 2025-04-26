import { Button, ButtonProps } from "@/components/ui/button";
import { QueryStatus } from "@reduxjs/toolkit/query";

function QueryButton({queryStatus, ...props}: ButtonProps & { queryStatus: QueryStatus }) {
  function getVariant() {
    switch (queryStatus) {
      case "fulfilled":
        return "success";
      case "rejected":
        return "destructive";
      default:
        return props.variant;
    }
  }

  function getDisabled() {
    switch (queryStatus) {
      case "pending":
      case "fulfilled":
        return true;
      default:
        return props.disabled;
    }
  }

  function getText() {
    switch (queryStatus) {
      case "pending":
        return "Loading...";
      case "fulfilled":
        return "Success";
      case "rejected":
        return "Try Again";
      default:
        return props.children;
    }
  }

  return (
    <Button {...props} variant={getVariant()} disabled={getDisabled()}>
      {getText()}
    </Button>
  );
}

export default QueryButton;