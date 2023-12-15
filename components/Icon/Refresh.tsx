import React from "react";
import { IconProps } from '@/components/Icon/index'
import { classNames } from '@/utils'

export default function RefreshIcon({ color, className, width, height }: IconProps) {

  return (
    <svg
      className={classNames(`text-${color}`, className)}
      width={width}
      height={height}
      viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_540_67773)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.1673 2.5C19.6276 2.5 20.0007 2.8731 20.0007 3.33333V8.33333C20.0007 8.79357 19.6276 9.16667 19.1673 9.16667H14.1673C13.7071 9.16667 13.334 8.79357 13.334 8.33333C13.334 7.8731 13.7071 7.5 14.1673 7.5H18.334V3.33333C18.334 2.8731 18.7071 2.5 19.1673 2.5Z"
          fill="currentColor" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 11.6663C0 11.2061 0.373096 10.833 0.833333 10.833H5.83333C6.29357 10.833 6.66667 11.2061 6.66667 11.6663C6.66667 12.1266 6.29357 12.4997 5.83333 12.4997H1.66667V16.6663C1.66667 17.1266 1.29357 17.4997 0.833333 17.4997C0.373096 17.4997 0 17.1266 0 16.6663V11.6663Z"
          fill="currentColor" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.8478 3.59814C10.766 3.28522 9.62253 3.25145 8.52414 3.49998C7.42576 3.7485 6.40823 4.27122 5.5665 5.01935C4.72477 5.76749 4.08628 6.71666 3.7106 7.7783C3.55707 8.21218 3.08088 8.43944 2.64701 8.2859C2.21313 8.13237 1.98587 7.65618 2.13941 7.22231C2.60901 5.89526 3.40712 4.70879 4.45928 3.77362C5.51144 2.83845 6.78335 2.18506 8.15634 1.8744C9.52932 1.56375 10.9586 1.60596 12.3109 1.9971C13.6588 2.387 14.8864 3.11094 15.8799 4.10172L19.7373 7.72635C20.0727 8.04151 20.0891 8.56889 19.774 8.90429C19.4588 9.23969 18.9314 9.25609 18.596 8.94093L14.7294 5.3076C14.723 5.30164 14.7168 5.29557 14.7106 5.28942C13.9145 4.49291 12.9296 3.91105 11.8478 3.59814ZM0.226042 11.0963C0.541201 10.7609 1.06858 10.7445 1.40398 11.0597L5.27065 14.693C5.277 14.699 5.28325 14.705 5.2894 14.7112C6.08551 15.5077 7.07042 16.0896 8.15223 16.4025C9.23403 16.7154 10.3775 16.7492 11.4759 16.5006C12.5742 16.2521 13.5918 15.7294 14.4335 14.9813C15.2752 14.2331 15.9137 13.284 16.2894 12.2223C16.4429 11.7884 16.9191 11.5612 17.353 11.7147C17.7869 11.8682 18.0141 12.3444 17.8606 12.7783C17.391 14.1054 16.5929 15.2918 15.5407 16.227C14.4886 17.1622 13.2166 17.8156 11.8437 18.1262C10.4707 18.4369 9.04138 18.3947 7.68913 18.0035C6.34117 17.6136 5.11356 16.8897 4.12009 15.8989L0.262689 12.2743C-0.0727107 11.9591 -0.089118 11.4317 0.226042 11.0963Z"
          fill="currentColor" />
      </g>

      <defs>
        <clipPath id="clip0_540_67773">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
};
