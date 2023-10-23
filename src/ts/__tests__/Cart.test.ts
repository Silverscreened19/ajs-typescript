import Cart from '../service/Cart';
import Movie from '../domain/Movie';
import Book from '../domain/Book';
import MusicAlbum from '../domain/MusicAlbum';

test('new card should be empty', () => {
  const cart = new Cart();

  expect(cart.items.length).toBe(0);
});

test('add item to cart', () => {
  const cart = new Cart();
  const movie = new Movie(666, 'The Avengers', 'The Avengers', 3500, 2012, 'USA', 'Avengers assemble!', 'action, sci-fi', 137);
  cart.add(movie);
  expect(cart.items).toEqual([{
    id: 666,
    name: 'The Avengers',
    originalName: 'The Avengers',
    price: 3500,
    year: 2012,
    country: 'USA',
    slogan: 'Avengers assemble!',
    genre: 'action, sci-fi',
    duration: 137,
  }]);
});

test('calculateTotalCost test', () => {
  const cart = new Cart();
  cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
  cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
  cart.add(new Movie(666, 'The Avengers', 'The Avengers', 3500, 2012, 'USA', 'Avengers assemble!', 'action, sci-fi', 137));
  expect(cart.calculateTotalCost()).toEqual(6400);
});

test('calculateTotalCostDiscount test', () => {
  const cart = new Cart();
  cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
  cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
  cart.add(new Movie(666, 'The Avengers', 'The Avengers', 3500, 2012, 'USA', 'Avengers assemble!', 'action, sci-fi', 137));
  expect(cart.calculateTotalCostDicsount(10)).toEqual(5760);
});

test('delete item', () => {
  const cart = new Cart();
  cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
  cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
  cart.add(new Movie(666, 'The Avengers', 'The Avengers', 3500, 2012, 'USA', 'Avengers assemble!', 'action, sci-fi', 137));
  cart.deleteItem(1001);
  expect(cart.items.length).toEqual(2);
  expect(cart.items).toEqual([
    {
      author: 'Linkin Park',
      id: 1008,
      name: 'Meteora',
      price: 900,
    },
    {
      id: 666,
      name: 'The Avengers',
      originalName: 'The Avengers',
      price: 3500,
      year: 2012,
      country: 'USA',
      slogan: 'Avengers assemble!',
      genre: 'action, sci-fi',
      duration: 137,
    },
  ]);
});

test('delete wrong item', () => {
  const cart = new Cart();
  cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
  cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
  cart.add(new Movie(666, 'The Avengers', 'The Avengers', 3500, 2012, 'USA', 'Avengers assemble!', 'action, sci-fi', 137));
  expect(() => { cart.deleteItem(1); }).toThrowError('Wrong ID');
});
