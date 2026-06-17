export const CSV_TEMPLATE = "name,email,product\n";
 
export const parseCSV = (data: string): ProductInput[] => {
  // Your CSV parsing logic here
  return [];
};
 
export interface ProductInput {
  name: string;
  email: string;
  product: string;
}
 