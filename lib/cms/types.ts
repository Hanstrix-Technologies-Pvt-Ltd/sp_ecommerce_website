export type GallerySection = "installation" | "concept";
export type ProjectStatus = "draft" | "published" | "archived";

export type PublicGalleryItem = {
  id: string | number;
  image: string;
  title?: string;
  location?: string;
  altText?: string;
  category?: string;
};

export type PublicProject = {
  id: string | number;
  name: string;
  image: string;
  location: string;
  spaces?: string;
  instagram?: string;
  slug?: string;
};

export type PublicTestimonial = {
  id: string;
  title: string;
  youtubeId: string;
};

export type PublicClient = {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
};
