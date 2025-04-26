import React from 'react';
import {create} from "zustand";
import SideBar from '../components/SideBar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';
import { useChatStore } from '../store/useChatStore';

const HomePage = () => {
const {selectedUser} = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex item-center justifu-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <SideBar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;
