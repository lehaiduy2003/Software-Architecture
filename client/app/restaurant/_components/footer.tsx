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
          <h4 className="text-xl font-bold mb-4">Liên Hệ</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="text-white" />
              <span>123 Đường Số 1, Quận 1, TP.HCM</span>
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
          <h4 className="text-xl font-bold mb-4">Giờ Mở Cửa</h4>
          <div className="space-y-2">
            <p>Thứ 2 - Thứ 6: 10:00 - 22:00</p>
            <p>Thứ 7 - Chủ Nhật: 09:00 - 23:00</p>
          </div>
        </div>
        <div>
          <h4 className="text-xl font-bold mb-4">Theo Dõi Chúng Tôi</h4>
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
      <div className="text-center mt-6 text-gray-500">
        © 2024 Nhà Hàng Việt Nam. Bản quyền được bảo lưu.
      </div>
    </motion.footer>
  );
}
