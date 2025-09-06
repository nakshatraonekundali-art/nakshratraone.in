-- AlterTable
ALTER TABLE "public"."Admin" ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpiry" TIMESTAMP(3);
