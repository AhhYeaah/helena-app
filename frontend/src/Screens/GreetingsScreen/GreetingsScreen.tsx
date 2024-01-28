import { Button } from "@chakra-ui/react";
import "./GreetingsScreen.css";

export function GreetingsScreen({ setMain }) {
  return (
    <div className="flex justify-center items-center absolute h-screen w-screen bg-white top-0 left-0 slow-fade-in">
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl ">Bem vinda, Helena!</h1>

        <Button colorScheme="blue" onClick={() => setMain(true)}>
          Iniciar
        </Button>
      </div>
    </div>
  );
}
