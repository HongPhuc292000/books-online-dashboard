import { Box, CardMedia, IconButton, styled } from "@mui/material";
import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { memo, useEffect, useState } from "react";
import noImageImg from "assets/img/no-image.jpg";

interface SquareMediaCardProps {
  url?: string;
  setImage: Function;
}

const RoundActionIconButton = styled(IconButton)(() => ({
  fontSize: 48,
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: "50%",
  height: "50%",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.5)",
  },
}));

const SquareMediaCard = memo(({ url, setImage }: SquareMediaCardProps) => {
  const [previewImage, setPreviewImage] = useState<string>();
  const [showSelectInput, setShowSelectInput] = useState<boolean>(false);
  const [hoverChange, setHoverChange] = useState<boolean>(false);

  const handleClearImage = () => {
    setImage({
      file: null,
      url: "",
    });
  };

  useEffect(() => {
    setPreviewImage(url);
  }, [url]);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        width: "160px",
        height: "160px",
        // mb: 2,
      }}
      onMouseOver={() => {
        setShowSelectInput(true);
      }}
      onMouseOut={(e) => {
        setShowSelectInput(false);
      }}
    >
      {showSelectInput && (
        <>
          <Box
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: "20px",
            }}
          ></Box>
          <RoundActionIconButton
            color="primary"
            sx={{
              left: 0,
              backgroundColor: hoverChange
                ? "rgba(255,255,255,0.5)"
                : "inherit",
            }}
          >
            <FlipCameraIosIcon fontSize="inherit" />
          </RoundActionIconButton>
          <RoundActionIconButton
            color="primary"
            sx={{
              right: 0,
            }}
            onClick={handleClearImage}
          >
            <HighlightOffIcon fontSize="inherit" />
          </RoundActionIconButton>

          <input
            accept="image/*"
            type="file"
            style={{
              cursor: "pointer",
              borderRadius: "50%",
              position: "absolute",
              width: "50%",
              height: "50%",
              top: "50%",
              transform: "translateY(-50%)",
              left: 0,
              zIndex: 1,
              opacity: 0,
            }}
            onChange={(e) => {
              if (e.target.files) {
                const imageUrl = URL.createObjectURL(e.target.files[0]);
                setImage({ url: imageUrl, file: e.target.files[0] });
              }
            }}
            onMouseOver={() => {
              setHoverChange(true);
            }}
            onMouseOut={() => {
              setHoverChange(false);
            }}
          />
        </>
      )}
      <CardMedia
        sx={{
          width: "160px",
          height: "160px",
          borderRadius: "20px",
          objectFit: "cover",
          border: "1px solid #c8c8c8",
        }}
        component="img"
        image={!!previewImage ? previewImage : noImageImg}
        alt="Author image"
      />
    </Box>
  );
});

export default SquareMediaCard;
