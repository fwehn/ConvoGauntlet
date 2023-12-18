#include "Wire.h"
const int I2C_address_MPU = 0x68;
int16_t aX, aY, aZ;
int16_t gX, gY, gZ;

char tmp_str[7];

char* convert_int16_to_str(int16_t i) {
  sprintf(tmp_str, "%6d", i);
  return tmp_str;
}

void setup() {
  Serial.begin(9600);
  Wire.begin();
  Wire.beginTransmission(I2C_address_MPU);
  Wire.write(0x6B);
  Wire.write(0);
  Wire.endTransmission(true);
}

void loop() {
  Wire.beginTransmission(I2C_address_MPU);
  Wire.write(0x3B);
  Wire.endTransmission(false);
  Wire.requestFrom(I2C_address_MPU, 7*2, true);
  aX = Wire.read()<<8 | Wire.read();
  aY = Wire.read()<<8 | Wire.read();
  aZ = Wire.read()<<8 | Wire.read();
  gX = Wire.read()<<8 | Wire.read();
  gY = Wire.read()<<8 | Wire.read();
  gZ = Wire.read()<<8 | Wire.read();

  Serial.print("a=");
    Serial.print(convert_int16_to_str(aX));Serial.print(";");
    Serial.print(convert_int16_to_str(aX));Serial.print(";");
    Serial.print(convert_int16_to_str(aX));
  Serial.print("g=");
    Serial.print(convert_int16_to_str(gX));Serial.print(";");
    Serial.print(convert_int16_to_str(gX));Serial.print(";");
    Serial.print(convert_int16_to_str(gX));
  Serial.print("f=");
    Serial.print(convert_int16_to_str(analogRead(A0)));Serial.print(";");
    Serial.print(convert_int16_to_str(analogRead(A1)));Serial.print(";");
    Serial.print(convert_int16_to_str(analogRead(A2)));Serial.print(";");
    Serial.print(convert_int16_to_str(analogRead(A3)));Serial.print(";");
    Serial.print(convert_int16_to_str(analogRead(A6)));
  Serial.println();
  delay(1000);
}