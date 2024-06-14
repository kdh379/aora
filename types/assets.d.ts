declare module "*.svg";
declare module "*.png" {
  const value: ImageSourcePropType;
  export default value;
}