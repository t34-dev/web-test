import React from "react";

interface DancingStickmanProps {
  className?: string;
  size?: number;
  color?: string;
}

export const DancingStickman: React.FC<DancingStickmanProps> = ({ className, size = 40, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ color }}
  >
    {/*<style>*/}
    {/*    .joint {fill: currentColor;}*/}
    {/*    .limb {stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round;}*/}

    {/*    @keyframes bodyBounce {*/}
    {/*    0 %, 100% {transform: translateY(0);}*/}
    {/*    50% {transform: translateY(-2px);}*/}
    {/*}*/}

    {/*    @keyframes leftArmSwing {*/}
    {/*    0 %, 100% {transform: rotate(-20deg);}*/}
    {/*    50% {transform: rotate(20deg);}*/}
    {/*}*/}

    {/*    @keyframes rightArmSwing {*/}
    {/*    0 %, 100% {transform: rotate(20deg);}*/}
    {/*    50% {transform: rotate(-20deg);}*/}
    {/*}*/}

    {/*    @keyframes leftLegSwing {*/}
    {/*    0 %, 100% {transform: rotate(-15deg);}*/}
    {/*    50% {transform: rotate(15deg);}*/}
    {/*}*/}

    {/*    @keyframes rightLegSwing {*/}
    {/*    0 %, 100% {transform: rotate(15deg);}*/}
    {/*    50% {transform: rotate(-15deg);}*/}
    {/*}*/}

    {/*    #body {*/}
    {/*    animation: bodyBounce 0.5s ease-in-out infinite;*/}
    {/*}*/}

    {/*    #leftArm {*/}
    {/*    transform - origin: 50px 30px;*/}
    {/*    animation: leftArmSwing 0.5s ease-in-out infinite;*/}
    {/*}*/}

    {/*    #rightArm {*/}
    {/*    transform - origin: 50px 30px;*/}
    {/*    animation: rightArmSwing 0.5s ease-in-out infinite;*/}
    {/*}*/}

    {/*    #leftLeg {*/}
    {/*    transform - origin: 50px 45px;*/}
    {/*    animation: leftLegSwing 0.5s ease-in-out infinite;*/}
    {/*}*/}

    {/*    #rightLeg {*/}
    {/*    transform - origin: 50px 45px;*/}
    {/*    animation: rightLegSwing 0.5s ease-in-out infinite;*/}
    {/*}*/}
    {/*</style>*/}

    <g id="body">
      <circle className="joint" cx="50" cy="20" r="5" />

      <line className="limb" x1="50" y1="25" x2="50" y2="45" />

      <g id="leftArm">
        <line className="limb" x1="50" y1="30" x2="35" y2="40" />
        <circle className="joint" cx="35" cy="40" r="2" />
      </g>

      <g id="rightArm">
        <line className="limb" x1="50" y1="30" x2="65" y2="40" />
        <circle className="joint" cx="65" cy="40" r="2" />
      </g>

      <g id="leftLeg">
        <line className="limb" x1="50" y1="45" x2="40" y2="65" />
        <circle className="joint" cx="40" cy="65" r="2" />
      </g>

      <g id="rightLeg">
        <line className="limb" x1="50" y1="45" x2="60" y2="65" />
        <circle className="joint" cx="60" cy="65" r="2" />
      </g>
    </g>
  </svg>
);
