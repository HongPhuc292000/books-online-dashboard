import { memo } from "react";

interface DefaultEllipsisProps {
  title: string;
  width: number;
}

export const DefaultEllipsisText = memo(
  ({ title, width }: DefaultEllipsisProps) => {
    return (
      <span
        style={{
          display: "inline-block",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          width: width,
        }}
      >
        {title}
      </span>
    );
  }
);
