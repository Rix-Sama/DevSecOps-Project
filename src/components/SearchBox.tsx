import { useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  display: "flex",
  alignItems: "center",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  cursor: "pointer",
  padding: theme.spacing(0, 1),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .NetflixInputBase-input": {
    width: 0,
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeIn,
    }),
    "&:focus": {
      width: "auto",
    },
  },
}));

export default function SearchBox() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>();

  const handleClickSearchIcon = () => {
    if (!isFocused) {
      searchInputRef.current?.focus();
    }
  };

  return (
    <Search
      sx={
        isFocused ? { border: "1px solid white", backgroundColor: "black" } : {}
      }
    >
      <SearchIconWrapper onClick={handleClickSearchIcon}>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        inputRef={searchInputRef}
        placeholder="Titles, people, genres"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        inputProps={{
          "aria-label": "search",
          onFocus: () => {
            setIsFocused(true);
          },
          onBlur: () => {
            setIsFocused(false);
          },
        }}
      />
      {/* 🚨 VULNÉRABILITÉ XSS: Affichage non sécurisé de l'entrée utilisateur */}
      {searchQuery && (
        <div 
          style={{ 
            position: 'absolute', 
            top: '100%', 
            left: 0, 
            right: 0, 
            background: 'white', 
            color: 'black', 
            padding: '8px',
            zIndex: 1000,
            fontSize: '12px'
          }}
          dangerouslySetInnerHTML={{ 
            __html: `Recherche: <strong>${searchQuery}</strong>` 
          }} 
        />
      )}
    </Search>
  );
}
