-- A test file for planetscale query language
--
-- basic query
--
select * from planet_scale where scale_id = 1;
--
select * from planet_scale where scale_id = 1 and scale_name = 'Earth';
--
select * from planet_scale where scale_id = 1 and scale_name = 'Earth' and scale_type = 'Planet';
