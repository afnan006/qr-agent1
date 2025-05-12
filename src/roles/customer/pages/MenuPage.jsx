import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import MenuCarousel from '../components/MenuCards/MenuCarousel';
import CartSlideOver from '../components/PaymentPanel/CartSlideOver';
import QuizOverlay from '../components/EngagementQuiz/QuizOverlay';
import { useCart } from '../context/CartContext';

// Mock menu data
const menuData = {
  starters: [
    { id: 's1', name: 'Garlic Bread', price: 5.99, emoji: '🍞', description: 'Freshly baked bread with garlic butter' },
    { id: 's2', name: 'Chicken Wings', price: 8.99, emoji: '🍗', description: 'Spicy buffalo wings with blue cheese dip' },
    { id: 's3', name: 'Mozzarella Sticks', price: 6.99, emoji: '🧀', description: 'Breaded and fried mozzarella sticks' },
    { id: 's4', name: 'Nachos', price: 7.99, emoji: '🌮', description: 'Tortilla chips with cheese, salsa, and guacamole' },
  ],
  mains: [
    { id: 'm1', name: 'Margherita Pizza', price: 12.99, emoji: '🍕', description: 'Classic pizza with tomato sauce and mozzarella' },
    { id: 'm2', name: 'Cheeseburger', price: 10.99, emoji: '🍔', description: 'Beef patty with cheese, lettuce, and tomato' },
    { id: 'm3', name: 'Pasta Carbonara', price: 13.99, emoji: '🍝', description: 'Spaghetti with creamy sauce, bacon, and parmesan' },
    { id: 'm4', name: 'Grilled Salmon', price: 15.99, emoji: '🐟', description: 'Fresh salmon fillet with lemon and herbs' },
  ],
  desserts: [
    { id: 'd1', name: 'Chocolate Cake', price: 6.99, emoji: '🍰', description: 'Rich chocolate cake with fudge frosting' },
    { id: 'd2', name: 'Ice Cream', price: 4.99, emoji: '🍦', description: 'Vanilla ice cream with chocolate sauce' },
    { id: 'd3', name: 'Apple Pie', price: 5.99, emoji: '🥧', description: 'Classic apple pie with cinnamon' },
    { id: 'd4', name: 'Cheesecake', price: 6.99, emoji: '🍮', description: 'New York-style cheesecake with berry compote' },
  ],
  drinks: [
    { id: 'dr1', name: 'Cola', price: 2.99, emoji: '🥤', description: 'Classic cola with ice' },
    { id: 'dr2', name: 'Lemonade', price: 3.49, emoji: '🍋', description: 'Freshly squeezed lemonade' },
    { id: 'dr3', name: 'Coffee', price: 3.99, emoji: '☕', description: 'Freshly brewed coffee' },
    { id: 'dr4', name: 'Mojito', price: 7.99, emoji: '🍹', description: 'Classic mojito with rum, mint, and lime' },
  ],
};

// Mock quiz data
const mockQuiz = {
  title: 'Food Trivia',
  questions: [
    {
      question: 'Which country is known as the birthplace of pizza?',
      answers: ['France', 'Italy', 'Spain', 'Greece'],
      correctAnswer: 1,
    },
    {
      question: 'What is the main ingredient in guacamole?',
      answers: ['Tomato', 'Avocado', 'Onion', 'Lime'],
      correctAnswer: 1,
    },
    {
      question: 'Which of these is NOT a pasta shape?',
      answers: ['Penne', 'Farfalle', 'Ravioli', 'Risole'],
      correctAnswer: 3,
    },
  ],
};

const MenuPage = () => {
  const navigate = useNavigate();
  const { cart, toggleCart } = useCart();
  const [showQuiz, setShowQuiz] = useState(false);
  
  // Show quiz after a delay (simulating engagement after user browses menu)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuiz(true);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F5F7FA] pb-20"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-md px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/customer/chat')}
            className="mr-3 p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={24} className="text-[#7A7F87]" />
          </button>
          <h1 className="font-bold text-lg">Menu</h1>
        </div>
        
        <motion.button
          onClick={toggleCart}
          className="relative p-2 rounded-full bg-[#4C4C9D] text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingCart size={20} />
          {cart.items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
              {cart.items.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </motion.button>
      </div>
      
      {/* Banner */}
      <div className="bg-[#4C4C9D] text-white p-6 mb-4">
        <h2 className="text-xl font-bold mb-2">Today's Special</h2>
        <p>Try our chef's recommendation: Truffle Pasta with Parmesan</p>
      </div>
      
      {/* Menu sections */}
      <div className="py-2">
        <MenuCarousel items={menuData.starters} title="Starters" />
        <MenuCarousel items={menuData.mains} title="Main Courses" />
        <MenuCarousel items={menuData.desserts} title="Desserts" />
        <MenuCarousel items={menuData.drinks} title="Drinks" />
      </div>
      
      <CartSlideOver />
      <QuizOverlay isOpen={showQuiz} onClose={() => setShowQuiz(false)} quiz={mockQuiz} />
    </motion.div>
  );
};

export default MenuPage;