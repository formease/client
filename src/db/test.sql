SELECT hhcellbndry (sdo_code || sdo_meta, 1, -180.000000000, 180.000000000,

           hhlength (sdo_code || sdo_meta), 'MIN') min_x,
       hhcellbndry (sdo_code || sdo_meta, 1, -180.000000000, 180.000000000,

           hhlength (sdo_code || sdo_meta), 'MAX') max_x, 
       hhcellbndry (sdo_code || sdo_meta, 2, -90.000000000, 90.000000000,

           hhlength (sdo_code || sdo_meta), 'MIN') min_y, 
       hhcellbndry (sdo_code || sdo_meta, 2, -90.000000000, 90.000000000,

           hhlength (sdo_code || sdo_meta), 'MAX') max_y 
FROM (SELECT DISTINCT sdo_code, sdo_meta FROM <layer_name>_sdoindex);

The following SQL query can be used to decode the index entries for a specific geometry stored in a <layername>_SDOINDEX table:

SELECT hhcellbndry (sdo_code || sdo_meta, 1, -180.000000000, 180.000000000,

          hhlength (sdo_code || sdo_meta), 'MIN') min_x,
       hhcellbndry (sdo_code || sdo_meta, 1, -180.000000000, 180.000000000,

          hhlength (sdo_code || sdo_meta), 'MAX') max_x, 
       hhcellbndry (sdo_code || sdo_meta, 2, -90.000000000, 90.000000000,

          hhlength (sdo_code || sdo_meta), 'MIN') min_y, 
       hhcellbndry (sdo_code || sdo_meta, 2, -90.000000000, 90.000000000,

          hhlength (sdo_code || sdo_meta), 'MAX') max_y 
FROM <layer_name>_sdoindex
WHERE sdo_gid = <geometry id>;