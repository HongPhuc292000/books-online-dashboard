import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box, CardMedia, IconButton, styled } from "@mui/material";
import noImageImg from "assets/img/no-image.jpg";
import { ChangeEvent, memo, useEffect, useState } from "react";

interface RoundMediaCardProps {
  url?: string;
  setImage: Function;
  mb?: number;
}

const RoundActionIconButton = styled(IconButton)(() => ({
  "fontSize": 48,
  "position": "absolute",
  "top": "50%",
  "transform": "translateY(-50%)",
  "width": "50%",
  "height": "50%",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.5)",
  },
}));

const RoundMediaCard = memo(({ url, setImage, mb }: RoundMediaCardProps) => {
  const [previewImage, setPreviewImage] = useState<string>();
  const [showSelectInput, setShowSelectInput] = useState<boolean>(false);
  const [hoverChange, setHoverChange] = useState<boolean>(false);

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setImage({ url: imageUrl, file: event.target.files[0] });
    }
  };

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
        mb: mb ? mb : 0,
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
            onChange={handleChangeImage}
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

export default RoundMediaCard;
