import { useIntl } from "react-intl";

export function useTranslation() {
  const intl = useIntl();

  return (id) => intl.formatMessage({ id });
}

export function useTranslationWithBreaks() {
  const intl = useIntl();
  return (id) => {
    const text = intl.formatMessage({ id });
    return { __html: text.replace(/(?:\r\n|\r|\n)/g, "<br />") };
  };
}
