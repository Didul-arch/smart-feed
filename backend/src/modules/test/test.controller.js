const prisma = require("../../db");
const supabase = require("../../config/supabase");
const catchAsync = require("../../core/helper/catchAsync");

class TestController {
  // Test koneksi database
  testDatabase = catchAsync(async (req, res) => {
    try {
      // Test basic connection
      await prisma.$connect();

      // Test query simple
      const userCount = await prisma.user.count();
      const kandangCount = await prisma.kandang.count();
      const sapiCount = await prisma.sapi.count();
      const pakanCount = await prisma.pakan.count();

      res.json({
        status: "success",
        message: "Database connection successful!",
        data: {
          connection: "OK",
          counts: {
            users: userCount,
            kandang: kandangCount,
            sapi: sapiCount,
            pakan: pakanCount,
          },
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Database connection failed!",
        error: error.message,
      });
    }
  });

  // Test koneksi Supabase Storage
  testStorage = catchAsync(async (req, res) => {
    try {
      // Test list buckets
      const { data: buckets, error: bucketsError } =
        await supabase.storage.listBuckets();

      if (bucketsError) {
        throw new Error(`Buckets error: ${bucketsError.message}`);
      }

      // Test specific bucket 'images'
      const { data: files, error: filesError } = await supabase.storage
        .from("images")
        .list("", { limit: 5 });

      if (filesError) {
        throw new Error(`Files error: ${filesError.message}`);
      }

      // Test upload dummy file (small text file)
      const testFileName = `test-${Date.now()}.txt`;
      const testContent = "SmartFeed Storage Test";

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(`test/${testFileName}`, testContent, {
          contentType: "text/plain",
        });

      if (uploadError) {
        throw new Error(`Upload error: ${uploadError.message}`);
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(`test/${testFileName}`);

      // Clean up - delete test file
      await supabase.storage.from("images").remove([`test/${testFileName}`]);

      res.json({
        status: "success",
        message: "Supabase Storage connection successful!",
        data: {
          connection: "OK",
          bucketsCount: buckets?.length || 0,
          buckets: buckets?.map((b) => b.name) || [],
          imagesFolder: {
            filesCount: files?.length || 0,
            sampleFiles: files?.slice(0, 3)?.map((f) => f.name) || [],
          },
          testUpload: {
            fileName: testFileName,
            publicUrl: urlData.publicUrl,
            uploadSuccess: true,
          },
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Supabase Storage connection failed!",
        error: error.message,
      });
    }
  });

  // Test semua koneksi sekaligus
  testAll = catchAsync(async (req, res) => {
    const results = {
      database: { status: "pending" },
      storage: { status: "pending" },
      environment: { status: "pending" },
    };

    // Test Environment Variables
    try {
      const requiredEnvs = [
        "DATABASE_URL",
        "DIRECT_URL",
        "JWT_SECRET",
        "SUPABASE_URL",
        "SUPABASE_SERVICE_ROLE_KEY",
      ];

      const missingEnvs = requiredEnvs.filter((env) => !process.env[env]);

      if (missingEnvs.length > 0) {
        results.environment = {
          status: "error",
          message: `Missing environment variables: ${missingEnvs.join(", ")}`,
        };
      } else {
        results.environment = {
          status: "success",
          message: "All required environment variables are set",
          data: {
            NODE_ENV: process.env.NODE_ENV,
            hasDatabase: !!process.env.DATABASE_URL,
            hasSupabase: !!process.env.SUPABASE_URL,
            hasJWT: !!process.env.JWT_SECRET,
          },
        };
      }
    } catch (error) {
      results.environment = {
        status: "error",
        message: `Environment check failed: ${error.message}`,
      };
    }

    // Test Database
    try {
      await prisma.$connect();
      const counts = {
        users: await prisma.user.count(),
        kandang: await prisma.kandang.count(),
        sapi: await prisma.sapi.count(),
        pakan: await prisma.pakan.count(),
      };

      results.database = {
        status: "success",
        message: "Database connection OK",
        data: { counts },
      };
    } catch (error) {
      results.database = {
        status: "error",
        message: `Database connection failed: ${error.message}`,
      };
    }

    // Test Storage
    try {
      const { data: buckets, error: bucketsError } =
        await supabase.storage.listBuckets();

      if (bucketsError) throw new Error(bucketsError.message);

      const imagesBucket = buckets?.find((b) => b.name === "images");

      results.storage = {
        status: "success",
        message: "Supabase Storage connection OK",
        data: {
          bucketsCount: buckets?.length || 0,
          hasImagesBucket: !!imagesBucket,
          buckets: buckets?.map((b) => b.name) || [],
        },
      };
    } catch (error) {
      results.storage = {
        status: "error",
        message: `Storage connection failed: ${error.message}`,
      };
    }

    // Overall status
    const allSuccess = Object.values(results).every(
      (r) => r.status === "success"
    );
    const overallStatus = allSuccess ? "success" : "partial";

    res.json({
      status: overallStatus,
      message: allSuccess
        ? "All systems operational!"
        : "Some systems have issues",
      data: results,
      timestamp: new Date().toISOString(),
    });
  });
}

module.exports = new TestController();
