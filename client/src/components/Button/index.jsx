import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-[49px]",
  circle: "rounded-[50%]",
  square: "rounded-[0px]",
};
const variants = {
  fill: {
    amber_300: "bg-amber-300",
    deep_purple_A100: "bg-deep_purple-A100",
    red_A200: "bg-red-A200",
    blue_300: "bg-blue-300",
    light_blue_100: "bg-light_blue-100 text-black-900_01",
    black_900_01: "bg-black-900_01 shadow-lg",
  },
};
const sizes = {
  md: "h-[99px] px-[35px] text-[29px]",
  sm: "h-[70px] px-[13px]",
  xs: "h-[38px] px-1.5",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "sm",
  color = "black_900_01",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex items-center justify-center text-center cursor-pointer ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["round", "circle", "square"]),
  size: PropTypes.oneOf(["md", "sm", "xs"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["amber_300", "deep_purple_A100", "red_A200", "blue_300", "light_blue_100", "black_900_01"]),
};

export { Button };
