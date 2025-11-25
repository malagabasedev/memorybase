import { useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import "../styles/Tooltip.css";

export function Tooltip({ children, content }) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  const wrapperRef = useRef(null);
  const arrowRef = useRef(null);
  let timer = useRef(null);

  useLayoutEffect(() => {
    const tooltip = tooltipRef.current;
    const wrapper = wrapperRef.current;
    const arrow = arrowRef.current;

    if (isVisible) {
      const resizeTooltip = () => {
        clearTimeout(timer);
        timer = setTimeout(() => placeTooltip(), 150);
      };

      const placeTooltip = () => {
        tooltip.dataset.placement = "";
        tooltip.classList.add("tooltip-out-of-screen");

        const { width: tooltipWidth, height: tooltipHeight } =
          tooltip.getBoundingClientRect();
        const {
          top: wrapperTop,
          left: wrapperLeft,
          width: wrapperWidth,
          height: wrapperHeight,
        } = wrapper.getBoundingClientRect();
        const wrapperPosY = window.scrollY + wrapperTop;

        let xPos = wrapperLeft - tooltipWidth / 2 + wrapperWidth / 2;
        let yPos;
        if (wrapperTop - tooltipHeight < 0) {
          tooltip.dataset.placement = "bottom";
          yPos = wrapperPosY + wrapperHeight;
        } else {
          tooltip.dataset.placement = "top";
          yPos = wrapperPosY - tooltipHeight;
        }

        // If tooltip can't be centered due to insufficient viewport width
        // adjust it and stick it to the right side of the screen
        const windowInnerWidth = window.innerWidth;
        const widthNeeded = xPos + tooltipWidth;
        if (widthNeeded > windowInnerWidth) {
          xPos += windowInnerWidth - widthNeeded;
        }

        tooltip.style.transform = `translate(${xPos}px, ${yPos}px)`;
        placeArrow(wrapperLeft, wrapperWidth);
        tooltip.classList.remove("tooltip-out-of-screen");
      };

      const placeArrow = (wrapperLeft, wrapperWidth) => {
        const tooltipLeft = tooltip.getBoundingClientRect().left;
        arrow.style.left = `${wrapperLeft - tooltipLeft + wrapperWidth / 2}px`;
      };

      placeTooltip();
      window.addEventListener("resize", resizeTooltip);

      return () => {
        window.removeEventListener("resize", resizeTooltip);
      };
    }
  }, [isVisible]);

  function handleOnMouseEnter() {
    setIsVisible(true);
  }

  function handleOnMouseLeave(e) {
    const related = e.relatedTarget;
    if (related && related.closest && related.closest(".tooltip")) return;

    setIsVisible(false);
  }

  const tooltipMarkup = (
    <div
      className="tooltip"
      ref={tooltipRef}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <div className="tooltip_content">{content}</div>
      <div className="tooltip_arrow" ref={arrowRef}></div>
    </div>
  );

  return (
    <>
      <div
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        ref={wrapperRef}
      >
        {children}
      </div>
      {isVisible && createPortal(tooltipMarkup, document.body)}
    </>
  );
}
