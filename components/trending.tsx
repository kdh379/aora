import { FlatList, ViewToken } from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";

import { Post } from "@/lib/appwrite";
import Video from "@/components/video";

const zoomIn = {
  0: {
    opacity: 1,
    scale: 0.9,
  },
  0.5: {
    opacity: 1,
    scale: 1.05,
  },
  1: {
    opacity: 1,
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    opacity: 1,
    scale: 1,
  },
  1: {
    opacity: 1,
    scale: 0.9,
  },
};

interface TrendingItemProps {
  activeItem: string;
  item: Post;
}

const TrendingItem = ({ activeItem, item }:TrendingItemProps) => {

  return (
    <Animatable.View
      className="mx-3"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      <Video
        uri={item.video}
        thumbnail={item.thumbnail}
        width={208}
        height={288}
      />
    </Animatable.View>
  );
};

interface TrendingProps {
  posts: Post[];
}

const Trending = ({ posts }: TrendingProps) => {
  const [activeItem, setActiveItem] = useState<string>(posts.length > 0 ? posts[0].$id : "");
  const viewableItemsChanged = (viewableItems: ViewToken<Post>[]) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={(info) => viewableItemsChanged(info.viewableItems)}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{
        x: 170,
        y: 0,
      }}
      horizontal
    />
  );
};

export default Trending;