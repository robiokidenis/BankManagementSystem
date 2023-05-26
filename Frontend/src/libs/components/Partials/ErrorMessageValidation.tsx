import React from "react";

interface Props {
  error: Record<string, string[]>;
}

const ErrorMessageValidation: React.FC<Props> = ({ error }) => {
  return (
    <>
      {Object.keys(error).map((fieldName) =>
        error[fieldName].map((message) => (
          <p key={`${fieldName}-${message}`} className="mt-1 text-sm text-red-600 dark:text-red-500">
            {message}
          </p>
        ))
      )}
    </>
  );
};

export default ErrorMessageValidation;
