#include "accelerometer.h"

#include <Wire.h>

#include <BMP180.h>
#include <MPU9250.h>

#include <I2Cdev.h>

MPU9250 accelgyro;
I2Cdev I2C_M;
BMP180 bmp180;

void initAccelerometer(){

  Wire.begin();
  Wire.setClock(400000);

  Serial.begin(115200);

  Serial.println("    ");
  Serial.println("Initializing I2C devices...");
  accelgyro.initialize();
  bmp180.init();


  Serial.println("Testing device connections...");
  Serial.println(accelgyro.testConnection() ? "MPU9250 connection successful" : "MPU9250 connection failed");

  delay(1000);
  Serial.println("     ");
}