import React from 'react'
import type { IconProps } from "./type";

const FacebookIcon = ({ width, height, className = "" }: IconProps) => {
  return (
    <div className={className}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 29 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_205_111)">
          <path
            d="M28.5 14.5C28.5 6.76801 22.232 0.5 14.5 0.5C6.76801 0.5 0.5 6.76801 0.5 14.5C0.5 21.4877 5.61957 27.2796 12.3125 28.3299V18.5469H8.75781V14.5H12.3125V11.4156C12.3125 7.90687 14.4027 5.96875 17.6005 5.96875C19.1318 5.96875 20.7344 6.24219 20.7344 6.24219V9.6875H18.9691C17.23 9.6875 16.6875 10.7668 16.6875 11.875V14.5H20.5703L19.9496 18.5469H16.6875V28.3299C23.3804 27.2796 28.5 21.4877 28.5 14.5Z"
            fill="#1877F2"
          />
          <path
            d="M19.9496 18.5469L20.5703 14.5H16.6875V11.875C16.6875 10.7679 17.23 9.6875 18.9691 9.6875H20.7344V6.24219C20.7344 6.24219 19.1323 5.96875 17.6005 5.96875C14.4027 5.96875 12.3125 7.90688 12.3125 11.4156V14.5H8.75781V18.5469H12.3125V28.3299C13.762 28.5567 15.238 28.5567 16.6875 28.3299V18.5469H19.9496Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_205_111">
            <rect
              width="28"
              height="28"
              fill="white"
              transform="translate(0.5 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default FacebookIcon
