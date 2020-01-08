import React from "react";
import NotFound from "../NotFound";
import {
  ShopsContent,
  StyledListItem,
  StyledBadge,
  InsteadOfImage,
  ImageContent,
  StyledListItemText
} from "./elements";

const ShopsList = ({ shops, onShopClick }) => {
  return (
    <ShopsContent>
      {shops.length ? (
        <>
          {shops.map(shop => (
            <StyledListItem
              key={shop.shop_id}
              button
              onClick={() => onShopClick(shop)}
            >
              <StyledBadge
                color="secondary"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                badgeContent={shop.counters.show}
              />
              <ImageContent>
                {shop.logo ? (
                  <img
                    width="143"
                    height="59"
                    src={`${process.env.REACT_APP_API_URL}${shop.logo}`}
                    alt="Shop logo"
                  />
                ) : (
                  <InsteadOfImage> {shop.title_en} </InsteadOfImage>
                )}
              </ImageContent>
              <div>
                <StyledListItemText>{shop.title_en}</StyledListItemText>
              </div>
            </StyledListItem>
          ))}
        </>
      ) : (
        <NotFound />
      )}
    </ShopsContent>
  );
};

export default ShopsList;
