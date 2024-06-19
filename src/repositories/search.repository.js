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
          name: sort,
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
          name: sort,
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
              name: sort,
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
              name: sort,
            },
          });
    
        return findSearches;
      };
  }
  