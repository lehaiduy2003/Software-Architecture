"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

export default function RestaurantFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#343A40] py-10"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
        <div>
          <h4 className="text-xl font-bold mb-4">Contact</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="text-white" />
              <span>123</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="text-white" />
              <span>0123 456 789</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="text-white" />
              <span>lienhe@nhahang.com</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-xl font-bold mb-4">Open Time</h4>
          <div className="space-y-2">
            <p>Monday - Friday: 10:00 - 22:00</p>
            <p>Saturday - Sunday: 09:00 - 23:00</p>
          </div>
        </div>
        <div>
          <h4 className="text-xl font-bold mb-4">Follow us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-primary transition-colors">
              Facebook
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-6 text-gray-500">© 2024 Policy and Terms.</div>
    </motion.footer>
  );
}
