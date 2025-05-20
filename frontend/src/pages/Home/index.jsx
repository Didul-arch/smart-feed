import { useAuth } from "@/hooks/useAuth";

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="container mx-auto py-12">
      <div className="bg-primary/10 rounded-xl p-8 text-center shadow">
        <h1 className="text-3xl font-bold mb-2">
          Halo, {currentUser?.name || "Peternak"}!
        </h1>
        <p className="text-muted-foreground text-lg">
          Selamat datang di Smart Feed. Kelola kandang, sapi, dan pakan dengan mudah.<br />
          Dashboard ringkasan akan muncul di sini setelah fitur jadwal selesai.
        </p>
      </div>
    </div>
  );
};

export default Home;