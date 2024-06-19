export class SearchRepository {
    constructor(prisma) {
      this.prisma = prisma;
    }
  
    getRegionSearch = async (regionName) => {
      const findSearches = await this.prisma.stores.findMany({
        where: { 
            address : {
                contains: regionName
            }
         },
        orderBy: {
          name: "asc",
        },
      });
  
      return findSearches;
    };
  
    getStoreSearch = async (storeName) => {
      const findSearches = await this.prisma.stores.findMany({
        where: { 
            name : {
                contains: storeName
            }
         },
        orderBy: {
          name: "asc",
        },
      });
  
      return findSearches;
    };
    
    getKeywordSearch = async (keyword) => {
        const findSearches = await this.prisma.stores.findMany({
            where: { 
                category : {
                    contains: keyword
                }
             },
            orderBy: {
              name: "asc",
            },
          });
    
        return findSearches;
      };

      getKeywordSearchOrderedbyRate = async (keyword) => {
        const findSearches = await this.prisma.stores.findMany({
            where: { 
                category : {
                    contains: keyword
                }
             },
            orderBy: {
                rating: "desc",
            },
          });
    
        return findSearches;
      };
  }
  