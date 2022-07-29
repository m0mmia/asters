import React, { useCallback, useEffect, useState } from "react";
import CircleTextCurrentColor from "../../../components/text-effects/CircleTextCurrentColor";

export const GenderIcon = (props) => {
  const { name } = props;
  const [circleText, setCircleText] = useState("");

  const getTitle = (newName) => {
    let title = "";
    const rp = Math.ceil(20 / newName.length);
    for (let i = 0; i < rp; i++) {
      title += `${newName} `;
    }
    console.log(title, newName.length, rp);

    return title;
  };
  const onCircleTextUpdate = useCallback(() => {
    setCircleText(getTitle(name));
  }, [setCircleText, name]);

  useEffect(() => {
    if (name) {
      onCircleTextUpdate();
    }
  }, [name, onCircleTextUpdate]);

  return (
    circleText && (
      <CircleTextCurrentColor
        text={circleText}
        fontFamily="Kanit"
        fontSize="42px"
        fontWeight="500"
        letterSpacing={props.letterSpacing}
      />
    )
  );
};
