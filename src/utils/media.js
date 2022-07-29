export function media(key) {
  return (props) => {
    return props.theme
      ? props.theme.mediaQueries[key]
      : props.mediaQueries[key];
  };
}
