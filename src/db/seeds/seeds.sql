insert into users
  (username, first_name, last_name, email, phone, password)
values
  ('tester', 'Inga', 'McIlenna', 'tester@test.com', '12042938913', 'tester');
insert into users
  (username, first_name, last_name, email, phone, password)
values
  ('jaeyoung', 'jaeyoung', 'kim', 'garajiji@hotmail.com', '12042938913', 'password');
  insert into users
  (username, first_name, last_name, email, phone, password)
values
  ('vlad', 'vlad', 'Kutsevolov', 'garajiji@garajiji.com', '12042938913', 'tester');
insert into users
  (username, first_name, last_name, email, phone, password)
values
  ('james', 'james', 'brown', 'james@garajiji.com', '12042938913', 'tester');
insert into users
  (username, first_name, last_name, email, phone, password)
values
  ('admin', 'Admin', 'Master', 'admin@garagesale.com', '12042938913', '1245');
insert into users
  (username, first_name, last_name, email, phone, password)
values
  ('eprout3', 'Effie', 'Prout', 'eprout3@ezinearticles.com', '1429394293', 'MvgAaVbFC');
insert into users
  (username, first_name, last_name, email, phone, password)
values
  ('asymon4', 'Almeda', 'Symon', 'asymon4@vinaora.com', '18001001004', 'OgPJMA4Phi');

insert into garage_sales
  (seller_id, title, cover_photo_url, description, city, province, created_at)
values
  (1, 'Beauty products for sale', 'https://i.imgur.com/p0pYOp0.jpg', 'Everything is $1!!! VERY VERY CHEAP!!! TAKE A LOOK!!!', 'Vancouver', 'British Columbia', '2020-10-27 08:14:22');
insert into garage_sales
  (seller_id, title, cover_photo_url, description, city, province, created_at)
values
  (2, 'Jae Garage', 'https://i.imgur.com/M5JdWn4.jpg', 'Big sale before moving', 'Winnipeg', 'Manitoba', '2020-09-09 14:08:48');
insert into garage_sales
  (seller_id, title, cover_photo_url, description, city, province, created_at)
values
  (3, 'Board Games', 'https://i.imgur.com/BJDjIEl.jpg', 'Board games! Need selling! COME ASAP!!!!', 'Calgary', 'Alberta', '2020-10-30 08:14:22');
insert into garage_sales
  (seller_id, title, cover_photo_url, description, city, province, created_at)
values
  (4, 'Plant sale', 'https://i.imgur.com/HC7Bscd.jpg', 'Selling some house plants.', 'Vancouver', 'British Columbia', '2020-10-31 08:14:22');
  insert into garage_sales
  (seller_id, title, cover_photo_url, description, city, province, created_at)
values
  (5, 'Kids toys', 'https://i.imgur.com/Li03xfH.jpg', 'Come and enjoy my garage sale', 'Calgary', 'Alberta', '2020-09-01 08:14:22');




insert into categories
  (name)
values
  ('All'),
  ('Electronics'),
  ('Furniture'),
  ('Apparels'),
  ('Books'),
  ('Toys'),
  ('Media'),
  ('Appliances'),
  ('Clothes'),
  ('Tools'),
  ('Others');



insert into products
  (seller_id, title, description, image_url, price, sold, sale_id, category_id)
values
  (1, 'Airpots', 'Airpot1 10mins of playtime after fully charged', 'https://images-na.ssl-images-amazon.com/images/I/71zny7BTRlL._AC_SL1500_.jpg', 1.00, false, 1, 2),
  (2, 'Rainbow Cloth package', 'You can be rainbow.', 'https://cdn1.expertreviews.co.uk/sites/expertreviews/files/2019/08/best_online_clothes_shops.jpg', 77, false, 2, 9),
  (2, 'Teddy Bear', 'Happy Mr.TeddyBear.', 'https://thumbs.dreamstime.com/z/toy-bear-29092432.jpg', 11.75, true, 2, 6),
  (1, 'Apple Wired Keyboard', 'Apple wired keyboard without wire.', 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Apple_Keyboard_with_Numeric_Keyboard_9612.jpg', 1.00, false, 1, 2),
  (1, 'Nike Shoe', 'Never wear. Size = 1',
    'https://www.pngjoy.com/pngm/53/1199732_nike-shoe-men-s-nike-zoom-fly-flyknit.png', 1.00, false, 1, 4),
  (2, 'Bike', 'I cannot ride it during winter time.', 'https://www.superebikes.ca/wp-content/uploads/2020/03/e-wild-s-black-2-560x560.jpg', 111.44, true, 2, 11),
  (1, 'Motorola Phone', 'It is foldable.', 'https://images.theconversation.com/files/107896/original/image-20160112-6996-1jahuzf.JPG?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop', 1.00, false, 1, 2),
  (2, 'Wine glasses', 'Only glasses, not wine!', 'https://thumbs.dreamstime.com/z/wine-glass-15320271.jpg', 14.22, false, 2, 11),
  (2, 'Toy CyberTruck', 'Toy BMW for kids.', 'https://www.tesla.com/xNVh4yUEc3B9/04_Desktop.jpg', 200.75, false, 2, 6),
  (3, 'Scrabble', 'Fun with letters for all the family!', 'https://i.imgur.com/7KWQ8eD.jpg', 10.00, false, 3, 6),
  (3, 'Bonkers', 'Crazy game that I never really understood', 'https://i.imgur.com/2LKthFV.jpg', 57.22, false, 3, 6),
  (1, 'Smart TV', 'Not turning on. For decoration purpose only', 'https://thumbs.dreamstime.com/z/television-monitor-texture-sky-isolated-white-background-54339475.jpg', 1.00, false, 1, 2),
  (4, 'Fern', 'Likes lots of water, easy to care for', 'https://i.imgur.com/MwWqMVQ.jpg', 20.00, false, 4, 11),
  (4, 'Small Cactus', 'Likes lots of sun', 'https://i.imgur.com/N2fU8cG.jpg', 10.00, false, 4, 11),
  (4, 'Anthurium', 'Nice pink leaves', 'https://i.imgur.com/RQkCHBp.jpg', 18.00, false, 4, 11),
  (4, 'Tree', 'Small tree with waxy leaves', 'https://i.imgur.com/agUFqEW.jpg', 12.00, false, 4, 11);






