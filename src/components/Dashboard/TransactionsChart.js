import React from "react";
import { ResponsivePie, Pie } from "@nivo/pie";
import { Card } from "react-bootstrap";

function TransactionsChart() {
  const data = [
    {
      id: "groceries",
      label: "groceries",
      value: 390,
      color: "hsl(256, 70%, 50%)",
    },
    {
      id: "transport",
      label: "transport",
      value: 395,
      color: "hsl(81, 70%, 50%)",
    },
    {
      id: "studies",
      label: "studies",
      value: 392,
      color: "hsl(223, 70%, 50%)",
    },
    {
      id: "transfers",
      label: "transfers",
      value: 331,
      color: "hsl(187, 70%, 50%)",
    },
    {
      id: "others",
      label: "others",
      value: 57,
      color: "hsl(220, 70%, 50%)",
    },
  ];

  return (
    <Card>
      <Card.Header>
        {" "}
        <Card.Title> Current month expenses overview </Card.Title>{" "}
      </Card.Header>
      <Card.Body className="d-flex justify-content-center p-0">
        <Pie
          data={data}
          width={400}
          height={400}
          margin={{ top: 0, right: 70, bottom: 70, left: 70 }}
          padAngle={1}
          innerRadius={0.5}
          fit={true}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 40,
              itemsSpacing: 0,
              itemWidth: 80,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </Card.Body>
    </Card>
  );
}

export default TransactionsChart;
